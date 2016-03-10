from field import Field

class Step(object):
    def __init__(self, order, name):
        self.name = name
        self.info_text = ""
        self.fields = []
        self.order = order

    def info(self, text):
        self.info_text = text

    def field(self, text, **kwargs):
        field = Field(text, **kwargs)
        self.fields.append(field)

    def json(self):
        return {
            'name': self.name,
            'infoText': self.info_text,
            'fields': [field.json() for field in self.fields],
            'order': self.order
        }
