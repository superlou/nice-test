class Field(object):
    id = 0

    def __init__(self, name, **kwargs):
        self.name = name
        self.type = kwargs.pop('type', 'check')

        self.id = Field.id
        Field.id += 1

    def json(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type
        }
