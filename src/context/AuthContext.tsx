import { ReactNode, createContext, useLayoutEffect, useState } from "react";
import {
  checkAuthToken,
  deleteMessages,
  getMessages,
  loginUser,
  sendMessage,
  signupUser,
  userLogout,
} from "../utils/apiCommunicator";
import toast from "react-hot-toast";

interface User {
  name: string;
  email: string;
}

interface UserAuth {
  isLoggedIn: boolean;
  user: User | null;
  isLoading: boolean;
  chatMessages: { id?: string; role: string; content: string }[] | [];
  setChatMessages: React.Dispatch<
    React.SetStateAction<
      | []
      | {
          _id: string;
          role: string;
          content: string;
        }[]
    >
  > | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getChats: () => Promise<void>;
  sendChat: (message: string) => Promise<void>;
  deleteChats: () => Promise<void>;
}

export const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<
    { _id: string; role: string; content: string }[] | []
  >([]);

  useLayoutEffect(() => {
    (async function checkLoginStatus() {
      setIsLoading(true);
      try {
        toast.loading("Loging In", { id: "autosignin" });
        const data = await checkAuthToken();
        if (data) {
          setUser({ email: data.email, name: data.name });
          setIsLoggedIn(true);
          toast.success("Logged In Successfully", { id: "autosignin" });
          getChats();
        } else {
          toast.error("Loging In Failed", {
            id: "autosignin",
          });
        }
      } catch (error) {
        toast.error("Loging In Failed", {
          id: "autosignin",
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    if (data) {
      console.log(data);
      document.cookie =
        data.Cookie_Name + "=" + data.token + ";" + data.expires;
      setUser({ email: data.email, name: data.name });
      setIsLoggedIn(true);
      getChats();
    }
  };
  const signup = async (name: string, email: string, password: string) => {
    const data = await signupUser(name, email, password);
    if (data) {
      console.log(data);
      document.cookie =
        data.Cookie_Name + "=" + data.token + ";" + data.expires;
      setUser({ email: data.email, name: data.name });
      setIsLoggedIn(true);
      getChats();
    }
  };
  const logout = async () => {
    try {
      toast.loading("Logging out...", { id: "logout" });
      await userLogout();
      setIsLoggedIn(false);
      toast.success("Logged out successfully", { id: "logout" });
    } catch (error) {
      console.log(error);
      toast.error("Logging out failed...", { id: "logout" });
    }
  };

  const getChats = async () => {
    const data = await getMessages();
    if (data) setChatMessages(data.data);
  };
  const sendChat = async (message: string) => {
    toast.loading("Getting response...", { id: "sendChat" });
    const data = await sendMessage(message);
    if (data) {
      setChatMessages((prevchats) => [...prevchats, data.newChat]);
      toast.success("Response generated", { id: "sendChat" });
    } else {
      toast.error("Something went wrong", { id: "sendChat" });
    }
  };
  const deleteChats = async () => {
    toast.loading("Deleting message...", { id: "deleteChat" });
    await deleteMessages();
    toast.success("Messages Deleted Successfully", { id: "deleteChat" });
    setChatMessages([]);
  };
  const value = {
    user,
    isLoggedIn,
    isLoading,
    chatMessages,
    setChatMessages,
    login,
    signup,
    logout,
    getChats,
    sendChat,
    deleteChats,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
