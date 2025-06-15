import { useState, useRef, useEffect } from "react";

// Componente genérico de Combobox
interface ComboboxProps<T> {
  items: T[];
  value: T | null;
  onChange: (item: T | null) => void;
  getDisplayValue: (item: T) => string;
  getFilterValue?: (item: T, search: string) => boolean;
  getItemId?: (item: T) => string | number;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  renderItem?: (item: T) => React.ReactNode;
}

function Combobox<T>({
  items,
  value,
  onChange,
  getDisplayValue,
  getFilterValue,
  getItemId = (item: any) => item.id || Math.random(),
  placeholder = "Buscar...",
  disabled = false,
  className = "",
  renderItem
}: ComboboxProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  // Establecer el término de búsqueda cuando hay un valor seleccionado
  useEffect(() => {
    if (value) {
      setSearchTerm(getDisplayValue(value));
    }
  }, [value, getDisplayValue]);

  // Filtrar elementos basados en el término de búsqueda
  const filteredItems = items.filter(item => {
    if (getFilterValue) {
      return getFilterValue(item, searchTerm);
    }
    return getDisplayValue(item).toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Cerrar dropdown al hacer clic fuera del componente
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Manejar la selección de un elemento
  const handleSelect = (item: T) => {
    onChange(item);
    setSearchTerm(getDisplayValue(item));
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={wrapperRef}>
      <input
        type="text"
        value={searchTerm}
        onChange={e => {
          setSearchTerm(e.target.value);
          if (!isOpen) setIsOpen(true);
          if (e.target.value === "" && value) {
            onChange(null);
          }
        }}
        onFocus={() => setIsOpen(true)}
        disabled={disabled}
        className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
        placeholder={placeholder}
      />
      
      {isOpen && filteredItems.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border max-h-60 overflow-auto">
          {filteredItems.map(item => (
            <div
              key={getItemId(item)}
              className="px-4 py-2 hover:bg-sky-50 cursor-pointer"
              onClick={() => handleSelect(item)}
            >
              {renderItem ? renderItem(item) : getDisplayValue(item)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Combobox;