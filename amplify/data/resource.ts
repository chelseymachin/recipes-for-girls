import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Recipe: a
    .model({
      title: a.string(),
      ingredientsJson: a.json(),
      stepsList: a.string(),
      prepTime: a.string(),
      cookTime: a.string(),
      photoUrl: a.string()
    })
    .authorization((allow) => [allow.owner()])
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 30
    }
  },
})