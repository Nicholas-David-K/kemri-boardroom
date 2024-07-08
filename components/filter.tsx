'use client';

const Filter = () => {
    const filterLinks = [
        {
            id: 1,
            name: 'Upcoming',
        },
        {
            id: 1,
            name: 'Pending',
        },
        {
            id: 1,
            name: 'Past',
        },
        {
            id: 1,
            name: 'Cancelled',
        },
    ];
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
                {filterLinks.map((item) => (
                    <button className="font-medium" key={item.id}>
                        {item.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Filter;
