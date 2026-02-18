import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

const ProductTable = ({ data, column }) => {
  const table = useReactTable({
    data,
    columns: column,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="p-4 bg-gray-100 rounded-xl shadow-lg">
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm text-gray-700">
          
          
          <thead className="bg-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                <th className=''>Sr.NO</th>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left font-semibold border-b border-gray-300"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          
          <tbody>
            {table.getRowModel().rows.map(((row,index) => (
              <tr
                key={row.id}
                className="hover:bg-gray-100 transition cursor-pointer"
              >
                <td className=' pl-2 '>{index+1}</td>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-3 border-b border-gray-200"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            )))}
          </tbody>

          
          <tfoot className="bg-gray-200">
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left font-medium border-t border-gray-300"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>

        </table>
      </div>
    </div>
  )
}

export default ProductTable
