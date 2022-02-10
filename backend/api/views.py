from api.serializers import WorkerSerializer
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from workers.models import Worker
from workers.reports import average_age_per_profession


class WorkerListCreateAPIView(ListCreateAPIView):
    queryset = Worker.objects.all()
    serializer_class = WorkerSerializer


class WorkerRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Worker.objects.all()
    serializer_class = WorkerSerializer


class Report(APIView):
    @staticmethod
    def get(request):
        queryset = Worker.objects.all()
        return Response(average_age_per_profession(queryset))
