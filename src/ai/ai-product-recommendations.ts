// This is a server-side file
'use server';

/**
 * @fileOverview A product recommendation AI agent.
 *
 * - getProductRecommendations - A function that handles the product recommendation process.
 * - GetProductRecommendationsInput - The input type for the getProductRecommendations function.
 * - GetProductRecommendationsOutput - The return type for the getProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetProductRecommendationsInputSchema = z.object({
  cartItems: z
    .array(
      z.object({
        productId: z.string().describe('The unique identifier for the product.'),
        name: z.string().describe('The name of the product.'),
        description: z.string().describe('A brief description of the product.'),
        price: z.number().describe('The price of the product.'),
      })
    )
    .describe('An array of product objects currently in the user\'s shopping cart.'),
  numberOfRecommendations: z
    .number()
    .default(3)
    .describe('The number of product recommendations to return.'),
});

export type GetProductRecommendationsInput = z.infer<
  typeof GetProductRecommendationsInputSchema
>;

const GetProductRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(
      z.object({
        productId: z.string().describe('The unique identifier for the recommended product.'),
        name: z.string().describe('The name of the recommended product.'),
        description: z.string().describe('A brief description of the recommended product.'),
        price: z.number().describe('The price of the recommended product.'),
      })
    )
    .describe('An array of recommended product objects.'),
});

export type GetProductRecommendationsOutput = z.infer<
  typeof GetProductRecommendationsOutputSchema
>;

export async function getProductRecommendations(
  input: GetProductRecommendationsInput
): Promise<GetProductRecommendationsOutput> {
  return getProductRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productRecommendationsPrompt',
  input: {schema: GetProductRecommendationsInputSchema},
  output: {schema: GetProductRecommendationsOutputSchema},
  prompt: `You are a product recommendation expert for an e-commerce website.

  Based on the items in the user's cart, recommend {{numberOfRecommendations}} additional products that the user might be interested in.
  Ensure that the recommendations are relevant to the items already in the cart.
  The output should be a JSON array of product objects with productId, name, description, and price fields.

  Here are the items in the user's cart:
  {{#each cartItems}}
  - Product ID: {{this.productId}}, Name: {{this.name}}, Description: {{this.description}}, Price: {{this.price}}
  {{/each}}`,
});

const getProductRecommendationsFlow = ai.defineFlow(
  {
    name: 'getProductRecommendationsFlow',
    inputSchema: GetProductRecommendationsInputSchema,
    outputSchema: GetProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
