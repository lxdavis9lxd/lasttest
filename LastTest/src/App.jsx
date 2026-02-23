import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";
import { Menu } from "lucide-react";
import { ApiClient } from "./utils/api.js";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";

const enrollmentData = [
  { name: "Alex", course: "Web Design Fundamentals", status: "Enrolled" },
  { name: "Jordan", course: "Advanced Web App Design", status: "Waitlisted" },
  { name: "Taylor", course: "eSports Strategy", status: "Enrolled" }
];

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [postsError, setPostsError] = useState("");
  const navigate = useNavigate();
  const client = new ApiClient("https://jsonplaceholder.typicode.com");

  const fetchPosts = async () => {
    setLoadingPosts(true);
    setPostsError("");
    const res = await client.getAll("/posts?_limit=5");
    if (res.success) {
      setPosts(res.data);
    } else {
      setPostsError(res.error || "Failed to load posts");
    }
    setLoadingPosts(false);
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Login", href: "/login" },
    { label: "Register", href: "/register" }
  ];

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-white">
        <div className="p-4 border-b font-semibold">Menu</div>
        <nav className="p-4 space-y-1">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="block px-2 py-2 rounded hover:bg-gray-100 text-sm">
              {l.label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <nav className="bg-white border-b px-4 py-3 flex items-center justify-between">
          {/* Mobile sidebar trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="p-4 border-b font-semibold">Menu</div>
              <nav className="p-4 space-y-1">
                {navLinks.map((l) => (
                  <a key={l.label} href={l.href} className="block px-2 py-2 rounded hover:bg-gray-100 text-sm">
                    {l.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-bold">BDPA React Scaffold and Demo</h1>
          <div />
        </nav>

        {/* Page content */}
        <div className="p-6 space-y-6 overflow-auto">

          {/* BDPA Logo Section */}
          <Card className="text-center">
            <CardContent className="pt-6">
              <img
                src="/BDPA_edited.png"
                alt="BDPA Logo"
                className="h-32 mx-auto mb-4"
              />
              <h1 className="text-3xl font-bold text-blue-600">Welcome to BDPA</h1>
              <p className="text-gray-600 mt-2">Black Data Professionals Association</p>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="components">Components</TabsTrigger>
              <TabsTrigger value="auth">Auth</TabsTrigger>
            </TabsList>
            <TabsContent value="overview"><p className="mt-2 text-sm">Welcome to the BDPA React Scaffold and Demo.</p></TabsContent>
            <TabsContent value="components"><p className="mt-2 text-sm">Buttons, Cards, Inputs, Tables, and more.</p></TabsContent>
            <TabsContent value="auth"><p className="mt-2 text-sm">Login + Registration pages included.</p></TabsContent>
          </Tabs>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Form/Card example */}
            <Card>
              <CardHeader><CardTitle>Sample Form</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="s-name">Student Name</Label>
                  <Input id="s-name" placeholder="e.g. Alex Johnson" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="s-email">Email</Label>
                  <Input id="s-email" type="email" placeholder="student@example.com" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="s-course">Course</Label>
                  <Input id="s-course" placeholder="Web Design Fundamentals" />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button>Save</Button>
                  <Button variant="secondary">Cancel</Button>
                </div>
              </CardContent>
            </Card>

            {/* Table example */}
            <Card>
              <CardHeader><CardTitle>Enrollment Overview</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {enrollmentData.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.course}</TableCell>
                        <TableCell>{row.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Button Variants */}
          <Card>
            <CardHeader><CardTitle>Button Variants</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Danger</Button>
              <Button variant="outline">Outline</Button>
            </CardContent>
          </Card>

          {/* Live API Demo */}
          <Card>
            <CardHeader><CardTitle>Live API Demo (JSONPlaceholder)</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-3">
                <Button onClick={fetchPosts} disabled={loadingPosts}>
                  {loadingPosts ? "Loading..." : "Fetch Posts"}
                </Button>
                {postsError && <span className="text-sm text-red-600">{postsError}</span>}
              </div>
              {posts.length > 0 && (
                <ul className="list-disc pl-6 space-y-1">
                  {posts.map((p) => (
                    <li key={p.id} className="text-sm">
                      <span className="font-medium">#{p.id}</span> {p.title}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Dialog + Toast */}
          <div className="flex gap-4">
            <Button onClick={() => setModalOpen(true)}>Open Dialog</Button>
            <Button onClick={() => toast.success("This is a toast!")}>
              Show Toast
            </Button>
          </div>

          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog Title</DialogTitle>
              </DialogHeader>
              <p className="text-sm">This is a dialog example using shadcn/ui.</p>
              <Button className="mt-4" onClick={() => setModalOpen(false)}>Close</Button>
            </DialogContent>
          </Dialog>

        </div>
      </div>
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route
        path="/login"
        element={
          <Login
            onSubmit={() => {
              alert("Login submitted!");
              navigate("/");
            }}
          />
        }
      />
      <Route
        path="/register"
        element={
          <Register
            onSubmit={() => {
              alert("Registration submitted!");
              navigate("/");
            }}
          />
        }
      />
    </Routes>
  );
}
