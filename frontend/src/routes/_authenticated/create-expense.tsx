import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useForm } from '@tanstack/react-form'


export const Route = createFileRoute('/_authenticated/create-expense')({
  component: CreateExpense,
})

function CreateExpense() {
  const navigate = useNavigate()
  const form = useForm({
    defaultValues: {
      title: '',
      amount: 0,
    },
    onSubmit: async ({ value }) => {
      await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate network delay
      const response = await api.expenses.$post({ json: value});
      if (!response.ok) {
        throw new Error('Failed to create expense')
      }
      navigate({to: '/expenses'})
    },
  });

  return (
    <div>
      <h2>Create Expense</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="max-w-xl m-auto"
      >
        <form.Field
          name="title"
          children={(field) => (
            <>
              <Label htmlFor={field.name}>Title</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={e => field.handleChange(e.target.value)}
              />
              {field.state.meta.isTouched && field.state.meta.errors && field.state.meta.errors.length > 0 ? (
              <em>{field.state.meta.errors[0]}</em>
              ) : null}

            </>
          )}
        />
        <form.Field
          name="amount"
          children={(field) => (
            <>
              <Label htmlFor={field.name}>Amount</Label>
              <Input
                id={field.name}
                name={field.name}
                type="number"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={e => field.handleChange(Number(e.target.value))}
              />
              {field.state.meta.isTouched && field.state.meta.errors && field.state.meta.errors.length > 0 ? (
                <em>{field.state.meta.errors[0]}</em>
              ) : null}
            </>
          )}
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button className="mt-4" type="submit" disabled={!canSubmit}>
              {isSubmitting ? '...' : 'Submit'}
            </Button>
          )}
        />
      </form>
    </div>
  )
}

// Define the type for expenses endpoint with $post method
type ExpensesApi = {
  $post: (args: { json: { title: string; amount: number } }) => Promise<Response>;
};

const api: { expenses: ExpensesApi } = {
  expenses: {
    $post: async ({ json }) => {
      // Replace with your actual API call logic
      return fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json),
      });
    },
  },
};
