#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// Function to distribute apples proportionally
void distributeApples() {
    vector<int> appleWeights;
    int weight;

    // Input collection
    cout << "Enter apple weight in gram (-1 to stop) : ";
    while (cin >> weight && weight != -1) {
        appleWeights.push_back(weight);
        cout << "Enter apple weight in gram (-1 to stop) : ";
    }

    // Calculate total weight
    int totalWeight = 0;
    for (int w : appleWeights) {
        totalWeight += w;
    }

    // Calculate required shares
    double ramShare = 0.50 * totalWeight;
    double shamShare = 0.30 * totalWeight;
    double rahimShare = 0.20 * totalWeight;

    // Sort apples in descending order by weight
    sort(appleWeights.begin(), appleWeights.end(), greater<int>());

    // Distribute apples
    vector<int> ramApples, shamApples, rahimApples;
    double ramTotal = 0, shamTotal = 0, rahimTotal = 0;

    for (int weight : appleWeights) {
        if (ramTotal + weight <= ramShare) {
            ramApples.push_back(weight);
            ramTotal += weight;
        } else if (shamTotal + weight <= shamShare) {
            shamApples.push_back(weight);
            shamTotal += weight;
        } else if (rahimTotal + weight <= rahimShare) {
            rahimApples.push_back(weight);
            rahimTotal += weight;
        } else {
            if (ramTotal < ramShare) {
                ramApples.push_back(weight);
                ramTotal += weight;
            } else if (shamTotal < shamShare) {
                shamApples.push_back(weight);
                shamTotal += weight;
            } else if (rahimTotal < rahimShare) {
                rahimApples.push_back(weight);
                rahimTotal += weight;
            }
        }
    }

    // Output results
    cout << "Distribution Result :" << endl;
    cout << "Ram : ";
    for (int w : ramApples) {
        cout << w << " ";
    }
    cout << endl;

    cout << "Sham : ";
    for (int w : shamApples) {
        cout << w << " ";
    }
    cout << endl;

    cout << "Rahim : ";
    for (int w : rahimApples) {
        cout << w << " ";
    }
    cout << endl;
}

int main() {
    distributeApples();
    return 0;
}
