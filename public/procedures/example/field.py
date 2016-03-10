class Field(object):
    def __init__(self, name, **kwargs):
        self.name = name
        self.type = kwargs.pop('type', 'check')

    def json(self):
        return {
            'name': self.name,
            'type': self.type
        }
