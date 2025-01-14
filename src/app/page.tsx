"use client";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/../amplify/data/resource";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator } from "@aws-amplify/ui-react";
import outputs from "@/../amplify_outputs.json"

Amplify.configure(outputs)

const client = generateClient<Schema>()

export default function App() {
  const [recipes, setRecipes] = useState<Array<Schema["Recipe"]["type"]>>([])
  const { signOut, user } = useAuthenticator()

  function listRecipes() {
    client.models.Recipe.observeQuery().subscribe({
      next: (data) => setRecipes({...data.items})
    })
  }

  useEffect(() => {
    listRecipes()
  }, [])

  function createRecipe() {
    client.models.Recipe.create({
      title: window.prompt("recipe title?"),
      ingredientsJson: window.prompt("ingredients as json"),
      stepsList: window.prompt("list of steps"),
      prepTime: window.prompt("prep time in minutes"),
      cookTime: window.prompt("cook time in minutes")
    })
  }

  function deleteRecipe(id: string) {
    client.models.Recipe.delete({ id })
  }
  return (
    <main>
      <h1>{user?.signInDetails?.loginId}'s Recipes</h1>
      <button onClick={createRecipe}>+ new</button>
      <ul>
        {recipes.map((recipe) => (
          <li
            key={recipe.id}
            onClick={() => deleteRecipe(recipe.id)}
          >{recipe.title}</li>
        ))}
      </ul>
      <button onClick={signOut}>Sign Out</button>
    </main>
  );
}
