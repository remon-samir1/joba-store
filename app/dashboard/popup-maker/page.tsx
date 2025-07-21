"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

const popupTemplates = [
  {
    id: 1,
    name: "Center popup",
    preview: "/placeholder.svg",
    selected: true,
  },
  {
    id: 2,
    name: "Right bottom - side in",
    preview: "/placeholder.svg",
    selected: false,
  },
  {
    id: 3,
    name: "Top bar",
    preview: "/placeholder.svg",
    selected: false,
  },
  {
    id: 4,
    name: "Left bottom notice",
    preview: "/placeholder.svg",
    selected: false,
  },
];

export default function PopupMakerPage() {
  return (
    <div className="flex-1 overflow-auto">
      <DashboardHeader title="Popup maker" />

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Popups</h2>
          <div className="flex space-x-2">
            <Button variant="outline">Popups</Button>
            <Button
              variant="outline"
              className="bg-orange-500 text-white hover:bg-orange-600"
            >
              Create new popup
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Popup Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Popup Details */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label htmlFor="popup-name">Popup name</Label>
                  <Input
                    id="popup-name"
                    placeholder="Popup name"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="popup-title">Popup title</Label>
                  <Input
                    id="popup-title"
                    placeholder="Popup title"
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Rich Text Editor Area */}
            <Card>
              <CardContent className="p-6">
                {/* Toolbar */}
                <div className="border-b pb-4 mb-4">
                  <div className="flex items-center space-x-4">
                    <Select defaultValue="paragraph">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paragraph">Paragraph</SelectItem>
                        <SelectItem value="heading1">Heading 1</SelectItem>
                        <SelectItem value="heading2">Heading 2</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select defaultValue="16px">
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12px">12px</SelectItem>
                        <SelectItem value="14px">14px</SelectItem>
                        <SelectItem value="16px">16px</SelectItem>
                        <SelectItem value="18px">18px</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select defaultValue="times-new-roman">
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="arial">Arial</SelectItem>
                        <SelectItem value="times-new-roman">
                          Times New Roman
                        </SelectItem>
                        <SelectItem value="helvetica">Helvetica</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm">
                        B
                      </Button>
                      <Button variant="outline" size="sm">
                        I
                      </Button>
                      <Button variant="outline" size="sm">
                        U
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Editor Content Area */}
                <div className="min-h-64 border rounded-lg p-4 bg-gray-50">
                  <p className="text-gray-500 text-center">
                    Rich text editor content area
                  </p>
                </div>

                <div className="mt-4 text-sm text-gray-500">Word count: 0</div>
              </CardContent>
            </Card>

            {/* Display Settings */}
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="triggers" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="triggers">Triggers</TabsTrigger>
                    <TabsTrigger
                      value="display"
                      className="bg-orange-500 text-white data-[state=active]:bg-orange-600"
                    >
                      Display
                    </TabsTrigger>
                    <TabsTrigger value="other">Other</TabsTrigger>
                  </TabsList>

                  <TabsContent value="triggers" className="mt-6">
                    <p className="text-gray-500">Trigger settings content</p>
                  </TabsContent>

                  <TabsContent value="display" className="mt-6">
                    <Button
                      variant="outline"
                      className="w-full bg-orange-500 text-white hover:bg-orange-600"
                    >
                      Display presets
                    </Button>

                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div>
                        <Label>Size</Label>
                        <p className="text-sm text-gray-500 mt-1">
                          Adjust the size settings
                        </p>
                      </div>
                      <div>
                        <Label>Animation</Label>
                        <p className="text-sm text-gray-500 mt-1">
                          Configure animations
                        </p>
                      </div>
                      <div>
                        <Label>Position</Label>
                        <p className="text-sm text-gray-500 mt-1">
                          Set popup position
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="other" className="mt-6">
                    <p className="text-gray-500">Other settings content</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Template Selection */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Templates</span>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      Visual
                    </Button>
                    <Button variant="ghost" size="sm">
                      Code
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Select one of the types below to get started! Once selected,
                  you can adjust the display settings using the tabs above.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {popupTemplates.map((template) => (
                    <div
                      key={template.id}
                      className={`border-2 rounded-lg p-3 cursor-pointer transition-colors ${
                        template.selected
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="aspect-video bg-gray-100 rounded mb-2 flex items-center justify-center">
                        <span className="text-xs text-gray-500">Preview</span>
                      </div>
                      <p className="text-xs text-center font-medium">
                        {template.name}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
