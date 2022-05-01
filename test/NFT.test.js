const NFT = artifacts.require("./NFT");

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('NFT', ([deployer, company, owner1, owner2]) => {
    const cost = web3.utils.toWei('1', 'ether')
    const royalityFee = 25 // 25%
    let nft

    beforeEach(async () => {
        nft = await NFT.new(
            "Capital NFT",
            "CAPITAL",
            "ipfs://link_to_finance_pdf/",
            royalityFee, // 25%
            company // company
        )
    })

    describe('deployment', () => {
        it('returns the deployer', async () => {
            const result = await nft.owner()
            result.should.equal(deployer)
        })

        it('returns the company', async () => {
            const result = await nft.company()
            result.should.equal(company)
        })

        it('returns the royality fee', async () => {
            const result = await nft.royalityFee()
            result.toString().should.equal(royalityFee.toString())
        })

        it('sets the royality fee', async () => {
            const newRoyalityFee = 50 // 50%

            await nft.setRoyalityFee(newRoyalityFee)

            const result = await nft.royalityFee()
            result.toString().should.equal(newRoyalityFee.toString())
        })
    })

    describe('royalities', async () => {
        const salePrice = web3.utils.toWei('10', 'ether')
        const totalRoyality = salePrice * 0.25
        let result

        beforeEach(async () => {
            await nft.mint({ from: owner1, value: cost })
        })

        it('initially belongs to owner1', async () => {
            const result = await nft.balanceOf(owner1)
            result.toString().should.equal('1')
        })

        it('successfully transfers to owner2', async () => {
            await nft.approve(owner2, 1, { from: owner1 })
            await nft.transferFrom(owner1, owner2, 1, { from: owner2, value: salePrice })

            result = await nft.balanceOf(owner1)
            result.toString().should.equal('0')

            result = await nft.balanceOf(owner2)
            result.toString().should.equal('1')
        })

        it('updates ether balances', async () => {
            // Approve sale
            await nft.approve(owner2, 1, { from: owner1 })

            const companyBalanceBefore = await web3.eth.getBalance(company)
            const owner1BalanceBefore = await web3.eth.getBalance(owner1)

            // Initiate transfer
            await nft.transferFrom(owner1, owner2, 1, { from: owner2, value: salePrice })

            const companyBalanceAfter = await web3.eth.getBalance(company)
            const owner1BalanceAfter = await web3.eth.getBalance(owner1)

            // If balances update, we know owner2 paid
            companyBalanceAfter.toString().should.equal((Number(companyBalanceBefore) + totalRoyality).toString())
            owner1BalanceAfter.toString().should.equal((Number(owner1BalanceBefore) + (salePrice - totalRoyality)).toString())
        })
    })
})