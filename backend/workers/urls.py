from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from workers.views import (
    ajax_delete,
    export_csv,
    WorkerCreateView,
    WorkerDeleteView,
    WorkerDetailView,
    WorkerListView,
    WorkerUpdateView,
    )


urlpatterns = [
    path('', WorkerListView.as_view(), name='worker_list'),
    path('worker/<int:pk>', WorkerDetailView.as_view(), name='worker_detail'),
    path('create', WorkerCreateView.as_view(), name='worker_create'),
    path('update/<int:pk>', WorkerUpdateView.as_view(), name='worker_update'),
    path('delete/<int:pk>', WorkerDeleteView.as_view(), name='worker_delete'),
    path('ajax_delete/<int:pk>', ajax_delete, name='ajax_delete'),
    path('export_csv', export_csv, name='export-csv')
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
