from django.urls import path


from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path("simple_func", views.simple_func)
]
