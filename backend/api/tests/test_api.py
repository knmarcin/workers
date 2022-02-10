from rest_framework.reverse import reverse
from rest_framework.test import APITestCase
from workers.models import Worker


class WorkerTest(APITestCase):
    def setUp(self):
        Worker.objects.create(name="x", surname="x", age="2000-01-01", profession="1").save()
        Worker.objects.create(name="x", surname="x", age="2000-01-01", profession="2").save()
        Worker.objects.create(name="x", surname="x", age="2000-01-01", profession="3").save()
        Worker.objects.create(name="x", surname="x", age="2000-01-01", profession="4").save()

        self.test_data = {
            "name": "foo",
            "surname": "bar",
            "age": "2020-01-01",
            "profession": "foo"
        }

    def test_report(self):
        response_1 = self.client.get(reverse('workers-report'))
        Worker.objects.create(name="x", surname="x", age="2020-01-01", profession="4").save()
        response_2 = self.client.get(reverse('workers-report'))
        self.assertNotEqual(response_1.data, response_2.data)

    def test_get_list(self):
        response = self.client.get(reverse('worker-list'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Worker.objects.count(), 4)
        self.assertEqual(len(response.data), 4)

    def test_post(self):
        response = self.client.post(reverse('worker-list'), self.test_data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Worker.objects.count(), 5)

    def test_get_detail(self):
        item = Worker.objects.all()[0].id
        response = self.client.get(reverse('worker-detail', kwargs={'pk': item}))
        self.assertEqual(response.status_code, 200)

    def test_put_detail(self):
        item = Worker.objects.all()[0].id
        new_data = {
            "id": item,
            "name": "bar bar",
            "surname": "bar foo",
            "age": "2020-01-01",
            "profession": "foo"
        }
        response = self.client.put(reverse('worker-detail', kwargs={'pk': item}), data=new_data, format="json")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(Worker.objects.get(id=item).name, "bar bar")

    def test_delete_detail(self):
        item = Worker.objects.all()[0].id
        response = self.client.delete(reverse('worker-detail', kwargs={'pk': item}))
        self.assertFalse(Worker.objects.filter(id=item).exists())
        self.assertEqual(response.status_code, 204)
