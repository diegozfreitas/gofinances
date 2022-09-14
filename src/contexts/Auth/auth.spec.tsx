import { renderHook, act } from "@testing-library/react-hooks";
import { AuthProvider, UseAuth } from ".";
import { mocked } from "jest-mock";
import * as AuthSession from "expo-auth-session";

jest.mock("expo-auth-session");

describe("Auth Hook", () => {
  it("should be error with incorrectly Google params", async () => {
    //renderiza meu hook
    const { result } = renderHook(() => UseAuth(), {
      wrapper: AuthProvider,
    });

    try {
      //zerando o hook para um novo teste
      await act(() => result.current.singOut());

      //executa função especifica no hook
      await act(() => result.current.singInWithGoogle());
    } catch {
      //expectativa e resultado
      expect(result.current.user).toEqual({});
    }
  });

  it("must login with an existing google account", async () => {
    //simulando o retorno da primeira consulta no google
    const googleMocked = mocked(AuthSession.startAsync as any);
    googleMocked.mockReturnValue({
      type: "success",
      params: {
        access_token: "google_token",
      },
    });

    //simulando o retorno da segunda onde retorna os dados do usuario
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            id: "any_id",
            email: "any_email@gmail.com",
            name: "any_name",
            photo: "any_photo",
          }),
      })
    ) as jest.Mock;

    //renderiza meu hook
    const { result } = renderHook(() => UseAuth(), {
      wrapper: AuthProvider,
    });

    //executa função especifica no hook
    await act(() => result.current.singInWithGoogle());

    //expectativa e resultado
    expect(result.current.user.email).toBe("any_email@gmail.com");
  });

  it("user should not connect if cancel authentication with google", async () => {
    //simulando o retorno da lib > consulta no google
    const googleMocked = await mocked(AuthSession.startAsync as any);
    googleMocked.mockReturnValue({
      type: "error",
    });

    //renderiza meu hook
    const { result } = renderHook(() => UseAuth(), {
      wrapper: AuthProvider,
    });

    //zera o hook
    await act(() => result.current.singOut());

    //executa função especifica no hook
    await act(() => result.current.singInWithGoogle());

    //expectativa e resultado
    expect(result.current.user).toStrictEqual({});
  });

  it("ir should the logged in user logging out of the application", async () => {
    //simulando o retorno da primeira consulta no google
    const googleMocked = mocked(AuthSession.startAsync as any);
    googleMocked.mockReturnValue({
      type: "success",
      params: {
        access_token: "google_token",
      },
    });

    //simulando o retorno da segunda onde retorna os dados do usuario
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            id: "any_id",
            email: "any_email@gmail.com",
            name: "any_name",
            photo: "any_photo",
          }),
      })
    ) as jest.Mock;

    //renderiza meu hook
    const { result } = renderHook(() => UseAuth(), {
      wrapper: AuthProvider,
    });

    //executa função especifica no hook
    await act(() => result.current.singInWithGoogle());

    //zerando o hook para um novo teste
    await act(() => result.current.singOut());

    //expectativa e resultado
    expect(result.current.user).toStrictEqual({});
  });
});
