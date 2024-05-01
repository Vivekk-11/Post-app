import ModalOverlay from "./Modal";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { isCreatePostAction } from "../../../redux/actions/postActions";
import { FormEvent, useRef, useState } from "react";
import { ImCancelCircle } from "react-icons/im";

const CreatePostModal = () => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const { isCreatePost } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleAddPhoto = () => {
    fileRef.current?.click();
  };

  const closeModal = () => {
    dispatch(isCreatePostAction(false));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const isTitleValid = title.trim() !== "";
    const isDescriptionValid = description.trim() !== "";
    if (!isTitleValid) {
      setTitleError("Title is required!");
      return;
    }

    if (!isDescriptionValid) {
      setDescriptionError("Description is required!");
      return;
    }
  };

  if (!isCreatePost) return null;

  return (
    <ModalOverlay onClose={closeModal}>
      <h1 className={`font-bold text-3xl mobile:text-2xl`}>{`Add Post`}</h1>
      <form
        onSubmit={handleSubmit}
        className={`tab:h-full tab:overflow-y-scroll overflow-x-hidden flex flex-col gap-2 justify-center items-center my-2`}
      >
        <div className="flex items-start justify-between w-full tab:block">
          <div className="flex flex-col items-start gap-1">
            {descriptionError && (
              <p className="text-xl font-semibold text-red-700 self-start">
                {descriptionError}
              </p>
            )}
            <label htmlFor="description" className="text-gray-600 font-bold">
              Description:
            </label>
            <textarea
              id="description"
              cols={30}
              rows={5}
              className="resize-none mobile:h-32 mobile:w-64 outline-none bg-gray-300 py-3 p-4 placeholder:text-gray-600 text-lg placeholder:font-bold rounded-lg"
              placeholder="Description of post..."
              onChange={(event) => {
                setDescription(event.target.value);
                setDescriptionError("");
              }}
            ></textarea>
          </div>
          <div className="flex flex-col items-start gap-1 relative">
            <label htmlFor="image" className="text-gray-600 font-bold">
              Image:
            </label>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpg, image/jpeg, image/png"
              hidden
              onChange={(event) => {
                if (event?.target?.files?.[0]) {
                  //@ts-expect-error ignore typescript
                  setImage(event.target.files[0]);
                }
              }}
            />

            {image ? (
              <img
                src={
                  //@ts-expect-error ignore typescript
                  URL.createObjectURL(image)
                }
                className={`object-cover rounded-lg overflow-hidden w-72 h-40 cursor-pointer`}
                onClick={handleAddPhoto}
              />
            ) : (
              <div
                onClick={handleAddPhoto}
                className={`rounded-lg cursor-pointer w-72 h-40 mobile:w-64 mobile:h-32 border-dotted border-2 border-black  flex items-center justify-center`}
              >
                Add Post Image
              </div>
            )}
            {image && (
              <ImCancelCircle
                onClick={() => {
                  setImage("");
                }}
                className={`absolute h-5 w-5 rounded-full bg-white top-10 right-3 cursor-pointer`}
              />
            )}
          </div>
        </div>
        <div className="self-start flex flex-col items-start gap-1">
          {titleError && (
            <p className="text-1xl font-semibold text-red-700 self-start">
              {titleError}
            </p>
          )}
          <label htmlFor="title" className="text-gray-600 font-bold">
            Title:
          </label>
          <input
            id="title"
            className="outline-none bg-gray-300 py-3 p-4 placeholder:text-gray-600 text-lg placeholder:font-bold rounded-lg"
            type="text"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setTitleError("");
            }}
            placeholder="Post Title"
            required
          />
        </div>
        <div className="flex items-center self-end gap-2">
          <button
            onClick={closeModal}
            type="button"
            className={`bg-red-700 text-white py-2 px-4 rounded-lg`}
          >
            Cancel
          </button>
          <button className={`py-2`} type="submit">
            Add
          </button>
        </div>
      </form>
    </ModalOverlay>
  );
};

export default CreatePostModal;
