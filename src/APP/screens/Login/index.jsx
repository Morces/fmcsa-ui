import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router";
import useAuth from "@/hooks/use-auth";
import useAxios from "@/hooks/use-axios";
import useApp from "../../../hooks/use-app";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { saveToken, saveUser } = useAuth();

  const { setIsAuthenticated, setUser } = useApp();

  const navigate = useNavigate();

  const request = useAxios();

  const handleGetUser = async (token) => {
    let res = await request({
      method: "GET",
      url: "auth/me/",
      show_loading: false,
      show_message: false,
      require_token: true,
      custom_token: token,
    });

    if (res?.error) return;

    setUser(res);
    saveUser(res);
    navigate("/dashboard");
  };

  const handleSubmit = async () => {
    setLoading(true);

    const data = {
      username,
      password,
    };

    let res = await request({
      method: "POST",
      url: "auth/login/",
      body: data,
      show_success: true,
      success_message: "Login successful!",
    });

    if (res?.access) {
      await saveToken(res?.access);
      setIsAuthenticated(true);
      await handleGetUser(res?.access);
    } else {
      setLoading(false);
      return;
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-4 w-12 h-12 bg-primary rounded-lg flex items-center justify-center"
            >
              <Truck className="w-6 h-6 text-primary-foreground" />
            </motion.div>
            <CardTitle className="text-2xl font-bold">
              ELD Trip Planner
            </CardTitle>
            <CardDescription>
              Sign in to manage your fleet operations
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                />
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>

            <div className="mt-6 pt-4 border-t border-border text-center text-sm text-muted-foreground">
              <p>Demo Credentials:</p>
              <p className="font-mono">Username: morces | Password:123456</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
