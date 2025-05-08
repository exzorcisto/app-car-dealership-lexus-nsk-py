from rest_framework import serializers
from .models import Car

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'
        extra_kwargs = {
            'carid': {'read_only': True},  # carid только для чтения
            # Удаляем строку с fuel, так как она избыточна
        }