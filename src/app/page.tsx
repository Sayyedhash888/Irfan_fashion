import ScrollyTellingCanvas from "@/components/ScrollyTellingCanvas";
import StoryOverlay from "@/components/StoryOverlay";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* 
        The canvas component is sticky and fills the viewport. 
        It plays the sequence based on the scroll progress of the entire page.
      */}
      <ScrollyTellingCanvas />
      
      {/* 
        The story overlay provides the scrollable height (500vh) 
        and triggers the text animations as you scroll down.
      */}
      <StoryOverlay />
    </main>
  );
}
