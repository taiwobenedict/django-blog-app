from django.contrib.auth.models import User
from django.contrib.messages.api import success
from django.shortcuts import redirect, render
from .forms import SignUpForm
from django.contrib.auth import login, logout, authenticate
from django.urls import reverse_lazy
from django.contrib import messages
from django.contrib.auth.views import (
    PasswordResetView,
    PasswordResetDoneView,
    PasswordResetCompleteView,
    PasswordResetConfirmView,
)

from .forms import LoginForm
from django.utils.translation import gettext_lazy


# Create your views here.

def sign_up(request):
    if request.user.is_authenticated:
        return redirect('index')
    form = SignUpForm()
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('index')
        else:
            form = SignUpForm(request.POST)

    context = {'form': form}
    return render(request, 'registration/sign_up.html', context)


def user_login(request):
    if request.user.is_authenticated:
        return redirect('index')
    form = LoginForm()
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']

            try:
                User.objects.get(username = username)
            except:
                messages.error(request, message="User does not exit!!!")
                return redirect('login')

            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('index')
            else:
                messages.error(
                    request, message='username or password not correct!')
                form = LoginForm(request.POST)
    context = {'form': form, 'page': 'login'}
    return render(request, 'registration/sign_up.html', context)


class PasswordReset(PasswordResetView):
    template_name = "registration/change-password.html"
    success_url = reverse_lazy('password_reset_done')


class PasswordDone(PasswordResetDoneView):
    template_name = "registration/change-password.html"
    title = gettext_lazy('Password reset sent')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["passwordreset"] = 'done'
        return context


class PasswordConfirm(PasswordResetConfirmView):
  template_name = "registration/change-password.html"
  success_url = reverse_lazy('password-reset-complete')

  def get_context_data(self, **kwargs):
      context = super().get_context_data(**kwargs)
      context["passwordreset"] = 'confirm' 
      return context
  
  

class PasswordComplete(PasswordResetCompleteView):
  template_name = "registration/change-password.html"
  def get_context_data(self, **kwargs):
      context = super().get_context_data(**kwargs)
      context["passwordreset"] = 'complete' 
      return context
  



