"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "@/lib/auth-client";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  Settings,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { BiSupport } from "react-icons/bi";
import { signOut } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IconUser, IconFilePencil  } from '@tabler/icons-react';

export function UserAvatar({ user }: { user: { name?: string; image?: string | null | undefined } }) {
  return (
    <Avatar className="w-9 h-9 border">
      {user?.image ? (
        <AvatarImage
          key={user.image}
          src={user.image}
          alt={user.name || "User"}
        />
      ) : (
        <AvatarFallback>{user?.name?.[0]?.toUpperCase() || "U"}</AvatarFallback>
      )}
    </Avatar>
  );
}

export function GetUser() {
  const { data: session, isPending, error, refetch } = authClient.useSession();
  const isAuthenticated = !!session;
  const user = session?.user;
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-9 h-9 rounded-full" variant="outline">
           {isAuthenticated && user ? (
            <UserAvatar user={user} />
          ) : (
            <Avatar className="w-8 h-8 border">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2 justify-center">
              <UserAvatar user={user} />
              <div className="flex flex-col space-y-1">
                <span className="font-medium">{user.name}</span>
                <span className="text-xs">
                  {user.email}
                </span>
              </div>
            </div>
          ) : (
            <span className="font-medium">Guest User</span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <IconUser className="h-5 w-5" />
            <Link href="/profile">View Profile</Link>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LayoutDashboard className="h-5 w-5" />
            <Link href="/dashboard">Dashboard</Link>
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="h-5 w-5" />
            <Link href="/settings">Settings</Link>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconFilePencil className="h-5 w-5" />
            <Link href="/apply">Apply</Link>
            <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell className="h-5 w-5" />
            <Link href="/notifications">Notifications</Link>
            <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <BiSupport className="h-5 w-5" />
          <Link href="/support">Support</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="h-5 w-5" />
          Sign out
          <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
