import { ref, onMounted, onUnmounted } from "vue";

export function useScreenSize() {
  const isLargeScreen = ref(window.innerWidth > 768);
  const updateScreenSize = () => isLargeScreen.value > 768;

  onMounted(() => {
    window.addEventListener("resize", updateScreenSize);
  });
  onUnmounted(() => window.removeEventListener("resize", updateScreenSize));

  return { isLargeScreen };
}
