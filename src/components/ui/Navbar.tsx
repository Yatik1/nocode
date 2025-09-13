import { PanelLeftOpen, Save, ScanEye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useBuilder from "../../hooks/useBuilder";
import { BuilderContextProps } from "../../context/BuilderContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [email, setEmail] = useState(""); // ✅ Added email state
  const {
    page,
    pages,
    setOpen,
    setSelectedElement,
  } = useBuilder() as BuilderContextProps;

  function onOpen() {
    setOpen((prev: boolean) => !prev);
    setSelectedElement(null);
  }

  async function saveHandler() {
    const local_project = localStorage.getItem("project");
    if (!local_project || !project) {
      const save_url = `${import.meta.env.VITE_BASE_URL}/builder/projects/`;
      const id = uuidv4();

      const payload = {
        request_id: id,
        name: "Test",
        description: "Test Description",
        json_data: pages,
        is_published: false,
      };

      const res = await fetch(save_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      localStorage.setItem("project", JSON.stringify(data));
      setProject(data);

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status} ${JSON.stringify(data)}`);
      }
    } else {
      const update_url = `${import.meta.env.VITE_BASE_URL}/builder/projects/`;
      const project = JSON.parse(local_project);
      const payload = {
        page_id: page.id,
        project_id: project.id,
        json_data: pages,
        is_published: false,
      };

      const res = await fetch(update_url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      localStorage.setItem("project", JSON.stringify(data));
      setProject(data);

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status} ${JSON.stringify(data)}`);
      }
    }
  }

  function publishHandler() {
    const local_project = localStorage.getItem("project");
    const project = local_project ? JSON.parse(local_project) : null;
    const publish_url = `${import.meta.env.VITE_BASE_URL}/builder/projects/publish`;
    let payload;

    

    toast.custom((t) => (
      <div className="bg-white p-4 rounded-xl shadow-lg border w-[300px] relative">
        <h3 className="font-semibold text-sm mb-2">Website Published ✅</h3>
        <p className="text-xs text-gray-500 mb-3">
          Enter your email to receive a confirmation link:
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!project) {
      const id = uuidv4();
      payload = {
        request_id: id,
        name: "Test",
        description: "Test Description",
        json_data: page,
        is_published: true,
        page_id: page.id,
      };
    } else {
      payload = {
        project_id: project.id,
        name: "Test",
        description: "Test Description",
        json_data: page,
        is_published: true,
        page_id: page.id,
      };
    }

            // ✅ Simulate API call with Sonner loader
            toast.promise(
              new Promise((resolve) =>
                setTimeout(() => resolve(email), 2000)
              ),
              {
                loading: "Submitting email...",
                success: () => {
                  const id = uuidv4();
                  if (!project) {
                    payload = {
                      email: email,
                      request_id: id,
                      name: `${email}'s Test`,
                      description: `${email}'s Test Description`,
                      json_data: page,
                      is_published: true,
                      page_id: page.id
                    };
                  } else {

                    payload = {
                      email: email,
                      request_id: id,
                      project_id: project.id,
                      name: `${email}'s Test`,
                      description: `${email}'s Test Description`,
                      json_data: page,
                      is_published: true,
                      page_id: page.id,
                    };
                  }
                  fetch(publish_url, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.error) {
                        throw new Error(`Publish failed with error: ${data.error}`);
                      }
              
                      // ✅ Show Sonner toast with form
                      
                    })
                    .catch((err) => {
                      toast.error(err.message || "Something went wrong while publishing");
                    });
                  // setEmail("");
                  toast.dismiss(t); // Close the toast after success
                  return "Confirmation sent successfully 🎉";
                },
                error: "Failed to send confirmation email",
              }
            );
          }}
          className="flex gap-2"
        >
          <input
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-2 py-1"
            required
          />
          <button type="submit">Send</button>
        </form>
        <button
          onClick={() => toast.dismiss(t)}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    ));

  }

  return (
    <div className="sticky top-0 z-10 bg-white w-full h-[6.5vh] border-b border-gray-200 flex justify-between items-center align-center px-3 gap-1">
      <button
        className="flex items-center justify-center cursor-pointer"
        onClick={onOpen}
      >
        <PanelLeftOpen stroke="#646464" size={22} />
      </button>

      <div className="flex items-center justify-center gap-3 w-full">
        <div className="bg-black w-20 rounded-md h-8 text-white flex items-center justify-center gap-2 cursor-pointer">
          <p className="text-white text-sm">Save</p>
          <Save size={15} onClick={saveHandler} />
        </div>

        <div
          className="bg-white border border-gray-300 w-25 rounded-md h-8 text-black flex items-center justify-center gap-2 cursor-pointer"
          onClick={() => navigate("/preview")}
        >
          <p className="text-sm">Preview</p>
          <ScanEye size={15} />
        </div>
      </div>

      <div
        className="flex bg-black text-white rounded-md h-8 w-20 items-center justify-center text-sm cursor-pointer"
        onClick={() => publishHandler()}
      >
        Publish
      </div>
    </div>
  );
}

export default Navbar;
