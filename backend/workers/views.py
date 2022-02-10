import datetime
from django.shortcuts import reverse, get_object_or_404
from workers.models import Worker
from workers.forms import WorkerCreateForm
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from workers.reports import average_age_per_profession
from django.http import HttpResponse, JsonResponse
from datetime import datetime
import csv


class WorkerListView(ListView):
    model = Worker
    context_object_name = "workers"

    def get_context_data(self, *, object_list=None, **kwargs):
        queryset = object_list if object_list is not None else self.object_list
        return super().get_context_data(
            object_list=queryset,
            avg_age_report=average_age_per_profession(queryset),
            **kwargs)


class WorkerCreateView(CreateView):
    model = Worker
    form_class = WorkerCreateForm

    def get_success_url(self):
        return reverse('worker_list')


class WorkerDetailView(DetailView):
    model = Worker


class WorkerUpdateView(UpdateView):
    model = Worker
    form_class = WorkerCreateForm

    def get_success_url(self):
        return reverse('worker_list')


class WorkerDeleteView(DeleteView):
    model = Worker

    def get_success_url(self):
        return reverse('worker_list')


def export_csv(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = f"attachment; filename=Workers-AvgAge-{datetime.now()}.csv"

    writer = csv.writer(response)
    writer.writerow(['Profession', 'Age'])

    workers = Worker.objects.all()
    report = average_age_per_profession(workers)
    for item in report:
        writer.writerow([item['profession'], item['avg_age']])

    return response


def ajax_delete(request, pk):
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
    if is_ajax:
        worker = get_object_or_404(Worker, pk=pk)

        if request.method == 'DELETE':
            worker.delete()
            return JsonResponse({'status': 'item deleted'})
    return JsonResponse(status=400)
