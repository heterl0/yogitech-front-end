"use client";

import { useMemo, useEffect, useReducer, useCallback } from "react";

import axios, { endpoints } from "@/utils/axios";

import { AuthContext } from "./auth-context";
import { setSession, isValidToken } from "./utils";
import { AuthUserType, ActionMapType, AuthStateType } from "../../types";

// ----------------------------------------------------------------------
/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */
// ----------------------------------------------------------------------

enum Types {
  INITIAL = "INITIAL",
  LOGIN = "LOGIN",
  LOGINGOOGLE = "LOGINGOOGLE",
  REGISTER = "REGISTER",
  LOGOUT = "LOGOUT",
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.LOGINGOOGLE]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGINGOOGLE) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = "access";

type Props = {
  children: React.ReactNode;
};

type Token = {
  access: string;
  refresh: string;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const access = sessionStorage.getItem(STORAGE_KEY);

      if (access && isValidToken(access)) {
        setSession(access);

        const res = await axios.get(endpoints.auth.me);

        const user = res.data;

        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              ...user,
              access,
            },
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    const data = {
      email,
      password,
    };

    const res = await axios.post(endpoints.auth.login, data);

    const { access } = res.data;
    const resUser = await axios.get(endpoints.auth.me, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    const user = resUser.data;

    setSession(access);
    // setSession(refresh);

    dispatch({
      type: Types.LOGINGOOGLE,
      payload: {
        user: {
          ...user,
          access,
        },
      },
    });
  }, []);

  const loginWithGoogle = useCallback(async (auth_token: string) => {
    const data = {
      auth_token,
    };

    const res = await axios.post(endpoints.auth.google, data);

    const tokens = res.data.tokens as Token;
    const access = tokens.access;
    const resUser = await axios.get(endpoints.auth.me, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    const user = resUser.data;

    setSession(access);
    // setSession(refresh);

    dispatch({
      type: Types.LOGIN,
      payload: {
        user: {
          ...user,
          access,
        },
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(
    async (
      email: string,
      username: string,
      password: string,
      re_password: string
    ) => {
      const data = {
        email,
        username,
        password,
        re_password,
      };

      const res = await axios.post(endpoints.auth.register, data);

      const { access, user } = res.data;

      sessionStorage.setItem(STORAGE_KEY, access);

      dispatch({
        type: Types.REGISTER,
        payload: {
          user: {
            ...user,
            access,
          },
        },
      });
    },
    []
  );

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? "authenticated" : "unauthenticated";

  const status = state.loading ? "loading" : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: "jwt",
      loading: status === "loading",
      authenticated: status === "authenticated",
      unauthenticated: status === "unauthenticated",
      //
      loginWithGoogle,
      login,
      register,
      logout,
    }),
    [login, loginWithGoogle, logout, register, state.user, status]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
