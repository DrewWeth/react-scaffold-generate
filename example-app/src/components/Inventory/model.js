export const model = {
  "ComponentName": "Inventory",
  "componentName": "inventory",
  "attrs": [
    {
      "name": "name",
      "type": "string",
      "required": false
    },
    {
      "name": "description",
      "type": "string",
      "field": "textarea",
      "required": false
    },
    {
      "name": "issold",
      "type": "boolean",
      "required": false
    },
    {
      "name": "seller",
      "type": "string",
      "field": "email",
      "required": false
    }
  ],
  "meta": {
    "basepath": "example-app/"
  }
}