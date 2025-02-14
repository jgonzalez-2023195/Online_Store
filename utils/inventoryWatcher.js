import Product from '../src/product/product.model.js'

const watchInventory = () => {
    const changeStream = Product.watch();

    changeStream.on('change', async (change) => {
        if (change.operationType === 'update') {
            const updatedFields = change.updateDescription.updatedFields;

            if (updatedFields.stock !== undefined) {
                console.log(`Stock actualizado: ${updatedFields.stock}`);

                // Actualizar el estado del producto
                const newStatus = updatedFields.stock > 0 ? 'AVAILABLE' : 'NOT_AVAILABLE';
                await Product.findByIdAndUpdate(change.documentKey._id, { status: newStatus });

                console.log(`Estado del producto actualizado a: ${newStatus}`);
            }
        }
    });

    changeStream.on('error', (err) => {
        console.error('Error en ChangeStream:', err);
    });
};

export default watchInventory;