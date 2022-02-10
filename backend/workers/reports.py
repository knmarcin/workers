from django.db.models import Avg, DateField, DurationField, ExpressionWrapper, F, IntegerField
from django.db.models.functions import Cast, ExtractDay, Floor, Now


def average_age_per_profession(queryset):
    """
    Returns average age for profession
    """
    return (queryset
            .values('profession')
            .annotate(avg=Avg(Cast(Now(), output_field=DateField()) - F('age'), output_field=DurationField()))
            .annotate(avg_age=ExpressionWrapper(Floor(ExtractDay(F('avg'))/365.25), output_field=IntegerField()))
            .values('profession', 'avg_age'))
