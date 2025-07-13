import { createFileRoute } from '@tanstack/react-router'
import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Skeleton } from "@/components/ui/skeleton"



export const Route = createFileRoute('/expenses')({
  component: Expenses,
})

async function getAllExpenses() {
  const res = await (api.expenses as { $get: () => Promise<Response> }).$get();
  if(!res.ok) {
    throw new Error('server error')
}
const data = await res.json()
return data
}

function Expenses() {
  const { isPending, error, data } = useQuery({
    queryKey: ['get-all-expenses'],
    queryFn: getAllExpenses   
  });

  if (error) return 'An error has occurred: ' + error.message;
  return (
    <div className="p-2 max-w-3xl m-auto">
      <Table>
        <TableCaption>A list of all your expenses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {isPending
            ? Array(3)
            .fill(0)
            .map((_, index: number) => (
              <TableRow key={index}>
              <TableCell className="font-medium"><Skeleton className='h-4'/></TableCell>
              <TableCell><Skeleton className='h-4'/></TableCell>
              <TableCell><Skeleton className='h-4'/></TableCell>
              </TableRow>
            ))
            : (data?.expenses as Expense[]).map((expense: Expense) => (
            <TableRow key={expense.id}>
              <TableCell className="font-medium">{expense.id}</TableCell>
              <TableCell>{expense.title}</TableCell>
              <TableCell>{expense.amount}</TableCell>
            </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}

const invoices = [
  {
    expense: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    expense: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    expense: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    expense: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    expense: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    expense: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    expense: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]


