import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { User, CreditCard, Shield, Copy } from "lucide-react";

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="h2 mb-8">Settings</h1>

        <div className="space-y-8">
          <Card className="bg-n-7 border-n-6">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <User size={20} className="text-color-1" />
                <CardTitle className="text-xl">Profile</CardTitle>
              </div>
              <CardDescription className="text-n-3">Manage your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-code uppercase text-n-3">Full Name</label>
                <Input defaultValue="Brainwave Explorer" className="bg-n-8 border-n-6 text-n-1" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-code uppercase text-n-3">Email Address</label>
                <Input defaultValue="explorer@brainwave.ai" className="bg-n-8 border-n-6 text-n-1" disabled />
              </div>
              <Button className="bg-n-1 text-n-8 hover:bg-n-2">Update Profile</Button>
            </CardContent>
          </Card>

          <Card className="bg-n-7 border-n-6">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <CreditCard size={20} className="text-color-2" />
                <CardTitle className="text-xl">Subscription</CardTitle>
              </div>
              <CardDescription className="text-n-3">You are currently on the Pro plan.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <div className="text-lg font-bold text-n-1">Pro Plan</div>
                <div className="text-n-3 text-sm font-code uppercase">$19.99 / MONTH</div>
              </div>
              <Button variant="outline" className="border-n-6 text-n-1 hover:bg-n-6">Manage Billing</Button>
            </CardContent>
          </Card>

          <Card className="bg-n-7 border-n-6">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Shield size={20} className="text-color-3" />
                <CardTitle className="text-xl">API Access</CardTitle>
              </div>
              <CardDescription className="text-n-3">Integrate Brainwave AI into your own apps.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input value="bw_live_7x8h9j2k5l4m3n2p1" readOnly className="flex-1 bg-n-8 border-n-6 font-code text-xs text-n-3" />
                <Button variant="secondary" className="bg-n-6 hover:bg-n-5">
                  <Copy size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
