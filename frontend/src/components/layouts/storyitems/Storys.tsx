import Storyitems from "./Storyitems";
import { getAllStories } from "@/lib/storys/storyData";
import { StoryType } from "@/types/storyType";

const Storys = async (): Promise<JSX.Element> => {
  // getAllStories() যদি শুধুমাত্র array return করে
  const { stories }: { stories: StoryType[] } = await getAllStories();

  return (
    <div>
      <Storyitems stories={stories} />
    </div>
  );
};

export default Storys;
