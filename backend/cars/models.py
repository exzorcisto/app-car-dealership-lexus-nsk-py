from django.db import models

class Car(models.Model):
    carid = models.AutoField(primary_key=True, db_column='carid')
    model_name = models.CharField(max_length=255, blank=True, null=True)
    trimlevel = models.CharField(max_length=255, db_column='trimlevel')
    year = models.IntegerField()
    vin = models.CharField(max_length=255, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    color = models.CharField(max_length=255)
    bodywork = models.CharField(max_length=20)
    engine = models.IntegerField()
    engine_capacity = models.CharField(max_length=3)
    fuel = models.CharField(max_length=20, db_column='fuel')  # Убрали лишний комментарий
    image = models.CharField(max_length=100, blank=True, null=True)
    description_1 = models.TextField(blank=True, null=True)
    description_2 = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'cars'
        managed = False  # Важно для работы с существующей таблицей

    def __str__(self):
        return f"{self.model_name} {self.trimlevel} ({self.year})"