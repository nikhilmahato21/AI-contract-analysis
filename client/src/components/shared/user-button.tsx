"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";

function googleSignIn():Promise<void> {
  return new Promise((resolve) => {
    window.open(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`, "_self");
    resolve();
  });
}
export function UserButton() {
    const { user } = useCurrentUser();
    // Debug log to check user type
    if (user) {
        console.log('User object:', user);
        if (typeof user !== 'object' || user === null || Object.getPrototypeOf(user) !== Object.prototype) {
            return null; // Prevent rendering if not a plain object
        }
    }
    return (
        <div className="flex flex-1 items-center justify-center space-x-2 md:justify-end">
            {user ? (
                <div className="flex items-center space-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="size-8 rounded-full">{user.name}</Button>
                        </DropdownMenuTrigger>
                    </DropdownMenu>
                </div>
            ) : (
                <Button onClick={googleSignIn}>Get started</Button>
            )}
        </div>
    );
}