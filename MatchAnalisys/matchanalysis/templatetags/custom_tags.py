from django import template
import datetime

register = template.Library()


@register.filter
def index(indexable, i):
    return indexable[i]


@register.simple_tag
def current_time(format_string):
    return datetime.datetime.now().strftime(format_string)


@register.tag('prova')
def prova():
    return 'aaaaaaaaaaaaaaaa'
