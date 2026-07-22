import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { FiPlus, FiTrash2, FiEdit2, FiX, FiUpload, FiCheck } from "react-icons/fi";
import { useApi } from "../../hooks/useApi";
import { Cake } from "../../types";

interface WeightPriceOption {
  weight: string;
  price: string;
}

const emptyForm = {
  name: "",
  description: "",
  category: "birthday",
  isEggless: true,
};

const ManageCakes = () => {
  const { request } = useApi();
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [weightPrices, setWeightPrices] = useState<WeightPriceOption[]>([
    { weight: "500g", price: "" },
    { weight: "1kg", price: "" },
  ]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const loadCakes = () => {
    fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/cakes`)
      .then((res) => res.json())
      .then((data) => setCakes(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  };

  useEffect(loadCakes, []);

  const openNew = () => {
    setForm(emptyForm);
    setWeightPrices([
      { weight: "500g", price: "" },
      { weight: "1kg", price: "" },
    ]);
    setImageFile(null);
    setImagePreview("");
    setEditingId(null);
    setFormOpen(true);
  };

  const openEdit = (cake: Cake) => {
    setForm({
      name: cake.name,
      description: cake.description,
      category: cake.category,
      isEggless: cake.isEggless,
    });
    
    // Parses configuration using backend native weightOptions array and priceOptions Map/object
    if (cake.weightOptions && cake.priceOptions) {
      setWeightPrices(
        cake.weightOptions.map((w) => ({
          weight: w,
          price: String(
            cake.priceOptions instanceof Map 
              ? cake.priceOptions.get(w) 
              : (cake.priceOptions as Record<string, number>)[w] || cake.price || ""
          ),
        }))
      );
    } else if (cake.price) {
      setWeightPrices([{ weight: "500g", price: String(cake.price) }]);
    } else {
      setWeightPrices([{ weight: "500g", price: "" }]);
    }

    setImageFile(null);
    setImagePreview(cake.imageUrl || "");
    setEditingId(cake._id);
    setFormOpen(true);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleWeightPriceChange = (index: number, field: keyof WeightPriceOption, value: string) => {
    const updated = [...weightPrices];
    updated[index][field] = value;
    setWeightPrices(updated);
  };

  const addWeightPriceRow = () => {
    setWeightPrices([...weightPrices, { weight: "", price: "" }]);
  };

  const removeWeightPriceRow = (index: number) => {
    if (weightPrices.length === 1) {
      toast.error("At least one weight and price option is required");
      return;
    }
    setWeightPrices(weightPrices.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validWeightPrices = weightPrices.filter((wp) => wp.weight.trim() && wp.price.trim());
    if (validWeightPrices.length === 0) {
      toast.error("Please add at least one valid weight and price tier");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", form.name);
    formDataToSend.append("description", form.description);
    formDataToSend.append("category", form.category);
    formDataToSend.append("isEggless", String(form.isEggless));
    
    formDataToSend.append("weightPrices", JSON.stringify(
      validWeightPrices.map((wp) => ({
        weight: wp.weight.trim(),
        price: Number(wp.price),
      }))
    ));

    const baselinePrice = validWeightPrices[0]?.price || "0";
    formDataToSend.append("price", String(Number(baselinePrice)));

    const weightOptionsArray = validWeightPrices.map((wp) => wp.weight.trim());
    weightOptionsArray.forEach((w) => formDataToSend.append("weightOptions", w));

    if (imageFile) {
      formDataToSend.append("image", imageFile);
    }

    try {
      if (editingId) {
        await request(`/cakes/${editingId}`, { 
          method: "PUT", 
          body: formDataToSend 
        });
        toast.success("Cake updated");
      } else {
        if (!imageFile) {
          toast.error("Please select a cake image");
          return;
        }
        await request("/cakes", { 
          method: "POST", 
          body: formDataToSend 
        });
        toast.success("Cake added to menu");
      }
      setFormOpen(false);
      loadCakes();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save cake");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this cake from the menu?")) return;
    try {
      await request(`/cakes/${id}`, { method: "DELETE" });
      toast.success("Cake removed");
      loadCakes();
    } catch (err) {
      toast.error("Failed to delete cake");
    }
  };

  return (
    <div className="min-h-screen bg-cream/20 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-blush-100 pb-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-cocoa tracking-wide">Cake Management</h2>
            <p className="text-xs text-cocoa/60 mt-0.5">Manage your dynamic live storefront menu options</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={openNew}
            className="flex items-center gap-2 bg-blush-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blush-600 shadow-sm transition-all duration-200"
          >
            <FiPlus size={16} /> Add New Cake
          </motion.button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="w-10 h-10 border-4 border-blush-200 border-t-blush-500 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cakes.map((cake) => (
              <div key={cake._id} className="bg-white rounded-2xl overflow-hidden border border-blush-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[4/3] w-full bg-cream/40">
                    <img src={cake.imageUrl} alt={cake.name} className="w-full h-full object-cover" />
                    {cake.isEggless && (
                      <span className="absolute top-3 left-3 bg-green-500/90 text-white px-2.5 py-0.5 text-[10px] font-bold tracking-wider rounded-md uppercase">
                        Eggless
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-bold tracking-wider text-blush-500 uppercase">{cake.category}</span>
                    <h3 className="font-semibold text-cocoa text-base line-clamp-1 mt-0.5">{cake.name}</h3>
                    <p className="text-xs text-cocoa/60 line-clamp-2 mt-1 mb-3 min-h-[2rem]">{cake.description}</p>
                    <p className="text-sm font-bold text-cocoa">
                      ₹{cake.price} <span className="text-xs font-normal text-cocoa/50">onwards</span>
                    </p>
                  </div>
                </div>
                <div className="p-4 pt-0 flex gap-2">
                  <button
                    onClick={() => openEdit(cake)}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold bg-blush-50 text-blush-700 py-2 rounded-xl hover:bg-blush-100 transition-colors"
                  >
                    <FiEdit2 size={12} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cake._id)}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold bg-red-50 text-red-600 py-2 rounded-xl hover:bg-red-100 transition-colors"
                  >
                    <FiTrash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {formOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex justify-center items-center p-4">
            <motion.div
              className="fixed inset-0 bg-cocoa/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFormOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl flex flex-col max-h-[85vh] overflow-hidden border border-blush-100"
            >
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-blush-50 bg-cream/10 shrink-0">
                <div>
                  <h3 className="text-lg font-bold text-cocoa">
                    {editingId ? "Modify Menu Item" : "Create New Menu Item"}
                  </h3>
                  <p className="text-[11px] text-cocoa/50 mt-0.5">Fill in the details below to publish your cake configuration.</p>
                </div>
                <button 
                  onClick={() => setFormOpen(false)} 
                  className="p-1.5 rounded-full text-cocoa/40 hover:text-cocoa/80 hover:bg-blush-50 transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Form Scroll Container */}
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 custom-admin-scrollbar">
                
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-cocoa/70 uppercase tracking-wider">Cake Name</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Elegant Chocolate Truffle"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-blush-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blush-400 focus:border-transparent transition-all"
                  />
                </div>

                {/* Classification Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-cocoa/70 uppercase tracking-wider">Category Classification</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full border border-blush-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blush-400 focus:border-transparent transition-all appearance-none cursor-pointer"
                    >
                      <option value="birthday">Birthday Cakes</option>
                      <option value="wedding">Wedding Specialties</option>
                      <option value="cupcake">Gourmet Cupcakes</option>
                      <option value="custom">Custom Designs</option>
                      <option value="seasonal">Seasonal Limited</option>
                    </select>
                  </div>

                  <div className="flex flex-col justify-end pb-1">
                    <label className="relative flex items-center gap-3 cursor-pointer select-none bg-cream/20 border border-blush-100 p-3 rounded-xl hover:bg-cream/40 transition-colors">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={form.isEggless}
                          onChange={(e) => setForm({ ...form, isEggless: e.target.checked })}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 border-2 rounded-md flex items-center justify-center transition-all ${form.isEggless ? 'bg-green-500 border-green-500 text-white' : 'border-blush-300 bg-white'}`}>
                          {form.isEggless && <FiCheck size={14} className="stroke-[3]" />}
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-cocoa/80">Mark item as 100% Eggless</span>
                    </label>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-cocoa/70 uppercase tracking-wider">Product Description</label>
                  <textarea
                    required
                    placeholder="Write a tempting description detailing flavors, textures, sponges, and decoration features..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full border border-blush-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blush-400 focus:border-transparent transition-all resize-none"
                    rows={3}
                  />
                </div>

                {/* Weight & Price Rows Matrix */}
                <div className="border border-blush-100 rounded-xl p-4 bg-cream/10 space-y-3">
                  <div className="flex justify-between items-center border-b border-blush-50 pb-2">
                    <div>
                      <label className="text-xs font-bold text-cocoa/80 uppercase tracking-wider">Weight & Price Matrix</label>
                      <p className="text-[10px] text-cocoa/50 mt-0.5">Specify configuration values per sizing variant tier</p>
                    </div>
                    <button
                      type="button"
                      onClick={addWeightPriceRow}
                      className="text-xs flex items-center gap-1 text-blush-600 font-bold hover:text-blush-700 bg-white px-2.5 py-1 rounded-lg border border-blush-200 shadow-sm"
                    >
                      <FiPlus size={12} /> Add Variation
                    </button>
                  </div>
                  
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {weightPrices.map((wp, index) => (
                      <div key={index} className="flex gap-2 items-center dynamic-row">
                        <div className="flex-1 relative">
                          <input
                            required
                            placeholder="Variant Size (e.g. 500g, 1kg)"
                            value={wp.weight}
                            onChange={(e) => handleWeightPriceChange(index, "weight", e.target.value)}
                            className="w-full border border-blush-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blush-400 transition-all"
                          />
                        </div>
                        <div className="flex-1 relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cocoa/40 text-sm font-medium">₹</span>
                          <input
                            required
                            type="number"
                            placeholder="Price Value"
                            value={wp.price}
                            onChange={(e) => handleWeightPriceChange(index, "price", e.target.value)}
                            className="w-full border border-blush-200 rounded-xl pl-6 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blush-400 transition-all"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeWeightPriceRow(index)}
                          className="text-cocoa/30 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors shrink-0"
                          title="Remove tier variation row"
                        >
                          <FiTrash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Media Uploader Box */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-cocoa/70 uppercase tracking-wider">Display Image Showcase</label>
                  <div className="flex items-center gap-4 border border-dashed border-blush-300 rounded-xl p-4 bg-cream/5 hover:bg-cream/10 transition-colors">
                    <label className="flex items-center gap-2 bg-white border border-blush-200 text-cocoa text-xs font-semibold px-4 py-2.5 rounded-lg cursor-pointer hover:bg-blush-50 shadow-sm transition-all whitespace-nowrap">
                      <FiUpload size={14} />
                      <span>Choose File Asset</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                    <span className="text-xs text-cocoa/50 truncate max-w-xs">
                      {imageFile ? imageFile.name : "No local image replacement selected"}
                    </span>
                  </div>
                  
                  {imagePreview && (
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-blush-200 bg-cream group shadow-sm mt-2">
                      <img src={imagePreview} alt="Preview Display Target" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </form>

              {/* Action Buttons Footer */}
              <div className="px-6 py-4 border-t border-blush-50 bg-cream/5 shrink-0 flex gap-3">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="flex-1 bg-white border border-blush-200 text-cocoa font-semibold py-2.5 rounded-xl text-sm hover:bg-blush-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="flex-1 bg-blush-500 text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-blush-600 shadow-sm transition-all"
                >
                  {editingId ? "Save Configurations" : "Publish to Menu"}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-admin-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-admin-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-admin-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(186, 140, 134, 0.3);
          border-radius: 20px;
        }
        .custom-admin-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(186, 140, 134, 0.5);
        }
      `}</style>
    </div>
  );
};

export default ManageCakes;