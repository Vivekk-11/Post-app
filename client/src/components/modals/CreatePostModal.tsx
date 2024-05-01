import ModalOverlay from "./Modal";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  createPostAction,
  isCreatePostAction,
} from "../../../redux/actions/postActions";
import { FormEvent, useRef, useState } from "react";
import { ImCancelCircle } from "react-icons/im";

const CreatePostModal = () => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [imageError, setImageError] = useState("");
  const { isCreatePost, createPostLoading } = useAppSelector(
    (state) => state.post
  );
  const dispatch = useAppDispatch();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleAddPhoto = () => {
    if (createPostLoading) return;
    fileRef.current?.click();
  };

  const closeModal = () => {
    if (createPostLoading) return;
    dispatch(isCreatePostAction(false));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (createPostLoading) return;
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
    if (!image) {
      setImageError("Image is required!");
      return;
    }

    const values = new FormData();
    values.append("title", title);
    values.append("description", description);
    values.append("postImage", image);

    dispatch(createPostAction(values));
  };

  if (!isCreatePost) return null;

  return (
    <ModalOverlay onClose={closeModal}>
      <h1
        className={`font-bold text-3xl mobile:text-2xl ${
          createPostLoading ? "opacity-65" : "opacity-100"
        }`}
      >{`Add Post`}</h1>
      <form
        onSubmit={handleSubmit}
        className={`tab:h-full tab:overflow-y-scroll overflow-x-hidden flex flex-col gap-2 justify-center items-center my-2 ${
          createPostLoading ? "opacity-65" : "opacity-100"
        }`}
      >
        <div className="flex items-start justify-between w-full tab:block">
          <div className="flex flex-col items-start gap-1 relative">
            {descriptionError && (
              <p className="text-lg font-bold text-red-700 self-start absolute -top-1 right-0">
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
                if (createPostLoading) return;
                else {
                  setDescription(event.target.value);
                  setDescriptionError("");
                }
              }}
            />
          </div>
          <div className="flex flex-col items-start gap-1 relative">
            {imageError && (
              <p className="text-xl font-bold text-red-700 self-start absolute -top-1 right-0">
                {imageError}
              </p>
            )}
            <label htmlFor="image" className="text-gray-600 font-bold">
              Image:
            </label>
            <input
              ref={fileRef}
              type="file"
              accept=".jpg, .jpeg, .png"
              hidden
              onChange={(event) => {
                if (createPostLoading) return;
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
                className={`object-cover rounded-lg overflow-hidden w-72 h-40 ${
                  createPostLoading ? "cursor-default" : "cursor-pointer"
                }`}
                onClick={handleAddPhoto}
              />
            ) : (
              <div
                onClick={handleAddPhoto}
                className={`rounded-lg w-72 h-40 mobile:w-64 mobile:h-32 border-dotted border-2 border-black  flex items-center justify-center ${
                  createPostLoading ? "cursor-default" : "cursor-pointer"
                }`}
              >
                Add Post Image
              </div>
            )}
            {image && (
              <ImCancelCircle
                onClick={() => {
                  if (createPostLoading) return;
                  setImage("");
                }}
                className={`absolute h-5 w-5 rounded-full bg-white top-10 right-3 ${
                  createPostLoading
                    ? "cursor-default opacity-65"
                    : "cursor-pointer"
                }`}
              />
            )}
          </div>
        </div>
        <div className="self-start flex flex-col items-start w-1/2 relative">
          {titleError && (
            <p className="text-xl font-bold text-red-700 self-start absolute -top-1 right-0">
              {titleError}
            </p>
          )}
          <label htmlFor="title" className="text-gray-600 font-bold">
            Title:
          </label>
          <input
            id="title"
            className="w-full outline-none bg-gray-300 py-3 p-4 placeholder:text-gray-600 text-lg placeholder:font-bold rounded-lg"
            type="text"
            value={title}
            onChange={(event) => {
              if (createPostLoading) return;
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
            className={`bg-red-700 hover:bg-red-700/60 text-white py-2 px-4 rounded-lg ${
              createPostLoading
                ? "cursor-default hover:bg-red-700"
                : "cursor-pointer"
            }`}
          >
            Cancel
          </button>
          <button
            className={`py-2 bg-slate-300 hover:bg-slate-200 ${
              createPostLoading
                ? "cursor-default hover:bg-slate-300"
                : "cursor-pointer"
            }`}
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    </ModalOverlay>
  );
};

export default CreatePostModal;
