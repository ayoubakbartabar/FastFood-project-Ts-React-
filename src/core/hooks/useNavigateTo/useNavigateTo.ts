import { useNavigate } from "react-router-dom";

/**
 * A reusable hook to navigate dynamically to any route with optional state.
 */
export default function useDynamicNavigate() {
  const navigate = useNavigate();

  const navigateTo = (path: string, state?: unknown) => {
    navigate(path, { state });
  };

  return { navigateTo };
}
