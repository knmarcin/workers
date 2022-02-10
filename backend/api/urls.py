from django.urls import path
from api.views import WorkerListCreateAPIView, WorkerRetrieveUpdateDestroyAPIView, Report


urlpatterns = [
    path('workers', WorkerListCreateAPIView.as_view(), name='worker-list'),
    path('workers/<int:pk>', WorkerRetrieveUpdateDestroyAPIView.as_view(), name='worker-detail'),
    path('report', Report.as_view(), name='workers-report'),
]
