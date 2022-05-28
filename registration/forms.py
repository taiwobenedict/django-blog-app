
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.forms.widgets import TextInput


class SignUpForm(UserCreationForm):
  first_name = forms.CharField(required=True, max_length=30, label='Name')
  class Meta:
    model = User
    fields = ['first_name', 'username', 'email', 'password1', 'password2' ]


class LoginForm(forms.Form):
  username = forms.CharField(max_length= 30, required= True)
  password = forms.CharField(max_length=20, widget= forms.PasswordInput,required= True)


  
