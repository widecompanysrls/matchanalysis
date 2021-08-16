from django import forms
from MatchAnalisys.matchanalysis.models import *
from django.forms import ModelForm, CharField, TextInput, NumberInput
from django.core.validators import validate_email, integer_validator


class IndexForm(forms.Form):
    session_id = forms.CharField(label='', max_length=37, required=True,
                                 widget=forms.TextInput(attrs={'class': 'IndexForm', 'placeholder': 'Session ID'}))
    session_psw = forms.CharField(label='',
                                  widget=forms.PasswordInput(attrs={'class': 'IndexForm', 'placeholder': 'Password'}),
                                  required=True)


class SessionForm(forms.Form):
    Nome = forms.CharField(label='', max_length=30, required=True,
                           widget=forms.TextInput(attrs={'class': 'SessionForm', 'placeholder': 'Session Name'}))
    Password = forms.CharField(label='',
                               widget=forms.PasswordInput(attrs={'class': 'SessionForm', 'placeholder': 'Password',
                                                                 'data-toggle': 'password'}),
                               required=True)


class DanceForm(forms.Form):
    Nome = forms.CharField(label='', max_length=30, required=True,
                           widget=forms.TextInput(attrs={'class': 'DanceForm', 'placeholder': 'Insert dance name'}))


class ParamForm(forms.Form):
    Nome = forms.CharField(label='', max_length=30, required=True,
                           widget=forms.TextInput(attrs={'class': 'ParamForm', 'placeholder': 'Insert paramether'}))


class CoupleForm(forms.Form):
    name1 = forms.CharField(label='', max_length=30, required=True,
                            widget=forms.TextInput(attrs={'class': 'CoupleForm', 'placeholder': 'Man Name'}))
    surname1 = forms.CharField(label='', max_length=30, required=True,
                               widget=forms.TextInput(attrs={'class': 'CoupleForm', 'placeholder': 'Man Surname'}))
    name2 = forms.CharField(label='', max_length=30, required=True,
                            widget=forms.TextInput(attrs={'class': 'CoupleForm', 'placeholder': 'Lady Name'}))
    surname2 = forms.CharField(label='', max_length=30, required=True,
                               widget=forms.TextInput(attrs={'class': 'CoupleForm', 'placeholder': 'Lady Surname'}))
    number = forms.IntegerField(label='', validators=[integer_validator], required=True,
                                widget=NumberInput(attrs={'class': 'CoupleForm', 'placeholder': 'Couple Number'}))
    email = forms.EmailField(label='', required=True, validators=[validate_email],
                             widget=forms.EmailInput(attrs={'class': 'CoupleForm', 'placeholder': 'Couple Email'}))


class JudgeForm(forms.Form):
    name = forms.CharField(label='', max_length=30, required=True,
                           widget=forms.TextInput(attrs={'class': 'JudgeForm', 'placeholder': 'Name'}))
    surname = forms.CharField(label='', max_length=30, required=True,
                              widget=forms.TextInput(attrs={'class': 'JudgeForm', 'placeholder': 'Surname'}))
    id_login = forms.CharField(label='', max_length=30, required=True,
                               widget=forms.TextInput(attrs={'class': 'JudgeForm_id', 'placeholder': 'Id'}))


class ResultsForm(forms.Form):
    session_id = forms.CharField(label='', max_length=37, required=True,
                                 widget=forms.TextInput(attrs={'class': 'ResultsForm', 'placeholder': 'Session ID'}))
    email = forms.EmailField(label='', required=True, validators=[validate_email],
                             widget=forms.EmailInput(attrs={'class': 'ResultsForm', 'placeholder': 'Email'}))
