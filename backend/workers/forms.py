from django import forms
from workers.models import Worker


class WorkerCreateForm(forms.ModelForm):
    class Meta:
        model = Worker
        fields = '__all__'
