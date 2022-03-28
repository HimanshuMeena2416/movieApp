from django.db import models
from django.utils.text import slugify
from io import BytesIO
from django.core import files
from django.urls import reverse
from django.contrib.auth.models import User


class movieSearchModel(models.Model):
    Title = models.CharField(max_length=100)
    release_date = models.CharField(max_length=100)
    rating = models.FloatField()
    searchQuery = models.CharField(max_length=100)
    imdbID = models.CharField(max_length=100)
