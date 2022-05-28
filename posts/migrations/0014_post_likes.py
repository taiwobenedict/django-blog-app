# Generated by Django 3.2.12 on 2022-03-27 23:46

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('posts', '0013_auto_20220326_0233'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='likes',
            field=models.ManyToManyField(null=True, related_name='likes', to=settings.AUTH_USER_MODEL),
        ),
    ]
