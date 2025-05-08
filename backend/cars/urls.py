from django.urls import path
from .views import CarListCreateView, CarRetrieveUpdateDestroyView

urlpatterns = [
    path('cars/', CarListCreateView.as_view(), name='car-list-create'),
    path('cars/<int:id>/', CarRetrieveUpdateDestroyView.as_view(), name='car-retrieve-update-destroy'),
]