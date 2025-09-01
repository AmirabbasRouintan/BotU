@echo off
cd Backend\server
python manage.py makemigrations
python manage.py migrate