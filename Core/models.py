from django.db import models

STAR_CHOICES = {
    ("Empty", "Empty"),
    ("Half", "Half"),
    ("Full", "Full")
}

class Star(models.Model):
    img = models.ImageField(null=True, blank=True)
    type = models.CharField(choices=STAR_CHOICES, 
                            default=None,
                            max_length=20)

    class Meta:
        verbose_name = "Star"
        verbose_name_plural = "Stars"

    def __str__(self):
        return self.type
