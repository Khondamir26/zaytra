import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Store, Megaphone } from "lucide-react"
import Link from "next/link"

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="ring-2 ring-accent/ shadow-xl bg-card text-card-foreground">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Choose your account type to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full w-full flex items-center gap-2 cursor-pointer transition-transform duration-200"
                >
                  <Link href="/vendor/signup">
                    <Store size={18} />
                    Vendor Account Sign Up
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full w-full flex items-center gap-2 cursor-pointer transition-transform duration-200"
                >
                  <Link href="/marketing/signup">
                    <Megaphone size={18} />
                    Marketing Account Sign Up
                  </Link>
                </Button>
              </div>


              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}