from django.test import TestCase
from workers.models import Worker
from workers.reports import average_age_per_profession


class TestReports(TestCase):
    def setUp(self) -> None:
        Worker.objects.create(profession="Software Engineer", name="x", surname="x", age="2000-01-01").save()
        Worker.objects.create(profession="Junior Software Engineer", name="x", surname="x", age="2000-01-01").save()
        Worker.objects.create(profession="Junior Software Engineer", name="x", surname="x", age="2000-01-01").save()
        Worker.objects.create(profession="Junior Software Engineer", name="x", surname="x", age="2000-01-01").save()
        Worker.objects.create(profession="Senior Software Engineer", name="x", surname="x", age="2000-01-01").save()

    def test_setup_creation(self):
        object_count = Worker.objects.count()
        self.assertEqual(object_count, 5)

    def test_average_age_per_profession_report(self):
        qs = Worker.objects.all()
        test = average_age_per_profession(qs)

        self.assertEqual(test.count(), 3)

    def test_report_change(self):
        qs = Worker.objects.filter(profession="Software Engineer")
        self.assertEqual(qs.count(), 1)
        test = average_age_per_profession(qs)
        value = test[0]['avg_age']

        Worker.objects.create(profession='Software Engineer', name='x', surname='x', age='2020-02-02').save()
        test = average_age_per_profession(qs)
        value_2 = test[0]['avg_age']
        self.assertNotEqual(value, value_2)
