from django.db import models


class Worker(models.Model):
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    profession = models.CharField(max_length=50)
    age = models.DateField(label='Birthdate YYYY-MM-DD')
    picture = models.ImageField(upload_to='avatars/', blank=True)

    def __str__(self):
        return f"{self.name} {self.surname}"
